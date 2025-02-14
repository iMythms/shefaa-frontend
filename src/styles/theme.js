import { createTheme } from '@mui/material/styles'

const theme = createTheme({
	typography: {
		fontFamily: '"Poppins", sans-serif', // Use preferred font
	},

	components: {
		MuiTableContainer: {
			styleOverrides: {
				root: {
					borderRadius: '16px', // Makes the table container rounded
					overflow: 'hidden', // Ensures rounded corners work properly
					boxShadow: '0px 24px 32px -3px rgba(3, 9, 50, 0.04)', // Soft shadow
				},
			},
		},

		MuiPaper: {
			styleOverrides: {
				root: {
					borderRadius: '16px', // Makes the table paper rounded
					overflow: 'hidden',
				},
			},
		},

		MuiTableHead: {
			styleOverrides: {
				root: {
					backgroundColor: '#f3f4f6', // Light gray background for the header
				},
			},
		},

		MuiTableRow: {
			styleOverrides: {
				root: {
					'&:last-child td, &:last-child th': {
						borderBottom: 'none', // Remove last row border
					},
				},
			},
		},

		MuiTableCell: {
			styleOverrides: {
				root: {
					padding: '12px 16px', // Add padding for a better layout
					borderBottom: '1px solid #e0e0e0', // Soft border between rows
				},
				head: {
					fontWeight: 'bold',
					color: '#333', // Darker text for headers
				},
			},
		},
	},
})

export default theme
