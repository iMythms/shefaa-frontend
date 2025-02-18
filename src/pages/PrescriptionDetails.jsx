import server from '@/services/server'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { debounce } from 'lodash'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

const PrescriptionDetails = () => {
	const { id } = useParams()
	const [prescription, setPrescription] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	// ICD and Lab search states
	const [icdSearch, setIcdSearch] = useState('')
	const [icdResults, setIcdResults] = useState([])

	const [labSearch, setLabSearch] = useState('')
	const [labResults, setLabResults] = useState([])

	// Medicines
	const [medicines, setMedicines] = useState([])

	const form = useForm({
		resolver: zodResolver(
			z.object({
				caseHistory: z.string().min(3, 'Case history is required'),
				treatment: z.string().min(3, 'Treatment is required'),
				icdCode: z.string().min(1, 'ICD code is required'),
				medicineName: z.string().min(1, 'Medicine name is required'),
				dosage: z.string().min(1, 'Dosage is required'),
				frequency: z.string().min(1, 'Frequency is required'),
				labRequest: z.string().optional(),
			})
		),
		defaultValues: {
			caseHistory: '',
			treatment: '',
			icdCode: '',
			medicineName: '',
			dosage: '',
			frequency: '',
			labRequest: '',
		},
	})

	useEffect(() => {
		const fetchPrescriptionDetails = async () => {
			try {
				const prescriptionRes = await server.query('get', `prescriptions/${id}`)
				console.log('Prescription Details:', prescriptionRes)
				setPrescription(prescriptionRes.prescription || null)
			} catch (error) {
				setError('Failed to load service details')
			} finally {
				setLoading(false)
			}
		}
		fetchPrescriptionDetails()
	}, [id])

	const searchICD = debounce(async (query) => {
		if (query.length < 3) {
			setIcdResults([]) // Clear results if query is too short
			return
		}
		try {
			const res = await server.query('get', `prescriptions/icd?q=${query}`)
			console.log('ICD Search Response:', res)
			setIcdResults(res.icd.slice(0, 50) || []) // Fetch only first 50 results (Backend should ideally limit this too)
		} catch (error) {
			console.error('Failed to search ICD codes:', error)
		}
	}, 500) // Increase debounce delay to 500ms

	// Search Lab Reports (Debounced API Call)
	const searchLab = debounce(async (query) => {
		if (!query) return setLabResults([])
		try {
			const res = await server.query('get', `prescriptions/labs?q=${query}`) // Corrected API route
			console.log('Lab Search Response:', res)
			setLabResults(res.reports || [])
		} catch (error) {
			console.error('Failed to search lab reports:', error)
		}
	}, 300)

	// Medicine Handlers
	const addMedicine = () => {
		const newMedicine = form.getValues(['medicineName', 'dosage', 'frequency'])
		setMedicines([...medicines, newMedicine])
		form.setValue('medicineName', '')
		form.setValue('dosage', '')
		form.setValue('frequency', '')
	}

	const removeMedicine = (index) => {
		setMedicines(medicines.filter((_, i) => i !== index))
	}

	const onSubmit = (data) => {
		console.log('✅ Final Prescription Submitted:', data, medicines)
	}

	if (loading)
		return <p className="text-center mt-10">Loading prescription details...</p>
	if (error) return <p className="text-red-500 text-center mt-10">{error}</p>

	return (
		<section className="container mx-auto my-24 xl:my-48 px-5 xl:px-0">
			<h1 className="text-2xl font-bold mb-12">Prescription</h1>

			{/* Form */}
			<Form {...form} className="">
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					{/* Case History */}
					<FormField
						control={form.control}
						name="caseHistory"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Case History</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Enter patient's case history"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Treatment */}
					<FormField
						control={form.control}
						name="treatment"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Treatment</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Describe the treatment plan"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* ICD Search Field with Selection */}
					<FormItem>
						<FormLabel>Diagnosis (ICD Code)</FormLabel>
						<Input
							placeholder="Search ICD codes"
							value={icdSearch} // Show selected ICD code
							onChange={(e) => {
								setIcdSearch(e.target.value)
								searchICD(e.target.value)
							}}
						/>
						{icdResults.length > 0 && (
							<div className="border p-2 mt-2 bg-white shadow max-h-60 overflow-y-auto">
								{icdResults.slice(0, 10).map((code) => (
									<p
										key={code.id}
										className="cursor-pointer hover:bg-gray-200 p-1"
										onClick={() => {
											form.setValue('icdCode', code.id) // Set selected ICD in the form
											setIcdSearch(code.name) // Show selected ICD in input
											setIcdResults([]) // Hide results after selection
										}}
									>
										{code.name}
									</p>
								))}
								{icdResults.length > 10 && (
									<p className="text-sm text-gray-500">
										Showing 10 of {icdResults.length} results. Please refine
										your search.
									</p>
								)}
							</div>
						)}
					</FormItem>

					{/* Medicines Table */}
					<Table>
						<TableCaption>List of prescribed medicines</TableCaption>
						<TableHeader>
							<TableRow>
								<TableHead>Medicine</TableHead>
								<TableHead>Dosage</TableHead>
								<TableHead>Frequency</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{medicines.map((med, index) => (
								<TableRow key={index}>
									<TableCell>{med.medicineName}</TableCell>
									<TableCell>{med.dosage}</TableCell>
									<TableCell>{med.frequency}</TableCell>
									<TableCell>
										<Button
											variant="destructive"
											onClick={() => removeMedicine(index)}
										>
											Remove
										</Button>
									</TableCell>
								</TableRow>
							))}
							{/* Add Medicine Inline Form */}
							<TableRow>
								<TableCell>
									<Input
										placeholder="Medicine name"
										{...form.register('medicineName')}
									/>
								</TableCell>
								<TableCell>
									<Input placeholder="Dosage" {...form.register('dosage')} />
								</TableCell>
								<TableCell>
									<Input
										placeholder="Frequency"
										{...form.register('frequency')}
									/>
								</TableCell>
								<TableCell>
									<Button onClick={addMedicine}>Add</Button>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>

					{/* Lab Search Field with Selection */}
					<FormItem>
						<FormLabel>Lab Request</FormLabel>
						<Input
							placeholder="Search lab tests"
							value={labSearch} // Show selected Lab test
							onChange={(e) => {
								setLabSearch(e.target.value)
								searchLab(e.target.value)
							}}
						/>
						{labResults.length > 0 && (
							<div className="border p-2 mt-2 bg-white shadow max-h-60 overflow-y-auto">
								{labResults.slice(0, 10).map((test) => (
									<p
										key={test.id}
										className="cursor-pointer hover:bg-gray-200 p-1"
										onClick={() => {
											form.setValue('labRequest', test.id) // Set selected lab test in form
											setLabSearch(test.name) // Show selected lab test in input
											setLabResults([]) // Hide results after selection
										}}
									>
										{test.name}
									</p>
								))}
								{labResults.length > 10 && (
									<p className="text-sm text-gray-500">
										Showing 10 of {labResults.length} results. Please refine
										your search.
									</p>
								)}
							</div>
						)}
					</FormItem>

					{/* Action Buttons */}
					<Button type="submit" className="mt-9">
						Save
					</Button>
				</form>
			</Form>
		</section>
	)
}

export default PrescriptionDetails
