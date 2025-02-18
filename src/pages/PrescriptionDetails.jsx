import server from '@/services/server'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'

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
import {
	Select,
	SelectItem,
	SelectTrigger,
	SelectContent,
} from '@/components/ui/select'

const PrescriptionDetails = () => {
	const { id } = useParams()
	const [prescription, setPrescription] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [labReports, setLabReports] = useState([])
	const [icdCodes, setIcdCodes] = useState([])

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
		const fetchICDCodes = async () => {
			try {
				const res = await server.query('get', 'prescriptions/icd')
				console.log(res)
				setIcdCodes(res.icd || [])
			} catch (error) {
				console.error('Failed to fetch ICD codes', error)
			}
		}

		fetchICDCodes()
	}, [])

	useEffect(() => {
		const fetchLabReports = async () => {
			try {
				const res = await server.query('get', `prescriptions/labs`)
				setLabReports(res.reports || [])
			} catch (error) {
				console.error('Failed to fetch lab reports', error)
			}
		}

		fetchLabReports()
	}, [id])

	useEffect(() => {
		const fetchPrescriptionDetails = async () => {
			try {
				const prescriptionRes = await server.query('get', `prescriptions/${id}`)
				console.log(prescriptionRes)
				setPrescription(prescriptionRes.prescription || null)
			} catch (error) {
				setError('Failed to load service details')
			} finally {
				setLoading(false)
			}
		}

		fetchPrescriptionDetails()
	}, [id])

	const [medicines, setMedicines] = useState([])

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
		console.log('Form submitted', data)
	}

	if (loading)
		return <p className="text-center mt-10">Loading prescription details...</p>
	if (error) return <p className="text-red-500 text-center mt-10">{error}</p>

	return (
		<section className="container mx-auto my-24 xl:my-48 px-5 xl:px-0">
			<h1 className="text-2xl font-bold mb-12">Prescription</h1>

			{/* Buttons for Discard or Complete and Save for Draft */}

			<div>
				{/* Case History */}
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
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
						<Button type="submit">Save</Button>
					</form>
				</Form>

				{/* Treatment */}
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
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
						<Button type="submit">Save</Button>
					</form>
				</Form>

				{/* Diagnose ICD */}
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name="icdCode"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Diagnosis (ICD Code)</FormLabel>
									<FormControl>
										<Select onValueChange={field.onChange} value={field.value}>
											<SelectTrigger>
												<span>{field.value || 'Select an ICD code'}</span>
											</SelectTrigger>
											<SelectContent>
												{icdCodes.map((code) => (
													<SelectItem key={code.id} value={code.id}>
														{code.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit">Save</Button>
					</form>
				</Form>

				{/* List of Medicines, it will be a table, and there is an inside form for listing the  */}
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
								<TableCell>{med.name}</TableCell>
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
						{/* Inline form to add new medicine */}
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

				{/* Lab request */}
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name="labRequest"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Lab Request</FormLabel>
									<FormControl>
										<Select onValueChange={field.onChange} value={field.value}>
											<SelectTrigger>
												<span>{field.value || 'Select a lab test'}</span>
											</SelectTrigger>
											<SelectContent>
												{labReports.map((report) => (
													<SelectItem key={report.id} value={report.name}>
														{report.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit">Request Test</Button>
					</form>
				</Form>
			</div>
		</section>
	)
}

export default PrescriptionDetails
