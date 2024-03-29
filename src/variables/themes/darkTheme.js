import { createTheme } from '@material-ui/core/styles'
import { secondaryColor, hoverColor, /* headerColor */ } from 'Styles/mainStyles'
import { colors } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
// import { teal, red, grey } from '@material-ui/core/colors'


const theme = (color) => {

	let theme = createTheme({
		typography: {
			useNextVariants: true,
			suppressDeprecationWarnings: true,
		},
		overrides: {
			MuiTooltip: {
				tooltipPlacementRight: {
					background: '#fff',
					color: grey[700],
					fontSize: '12px',
				},
				tooltipPlacementBottom: {
					background: '#fff',
					color: grey[700],
					fontSize: '12px',
				},
				popper: {
					opacity: 1,
				}
			},
			MuiDialogContent: {
				root: { padding: 24, color: '#fff' }
			},
			MuiDialogTitle: {
				root: {
					fontSize: "1.25rem",
					fontFamily: "Roboto, Helvetica, Arial",
					fontWeight: 500,
					lineHeight: 1.6,
					letterSpacing: "0.0075em",
					backgroundColor: '#434351',
					color: 'white',
					padding: 16
				},

			},
			MuiListItem: {
				button: {
					transition: 'all 150ms cubic- bezier(0.4, 0, 0.2, 1) 0ms'
				}
			},
			MuiMenuItem: {
				root: {
					"&$selected": {
						backgroundColor: `${colors[color][400]} !important`,
						color: "#fff"
					}
				},
			},
			MuiCard: {
				root: {
					width: '100%',
					overflow: "hidden"
				}
			},
			MuiButton: {
				text: {
					textTransform: 'uppercase'
				}
			},
			MuiTypography: {
				body1: {
					fontSize: '0.875rem',
				}
			},
			MuiFormControl: {
				root: {
					minWidth: 230,
				}
			},
			MuiIcon: {
				root: {
					overflow: 'visible',
				},
			},
			MuiFormLabel: {
				root: {
					'&$focused': {
						color: colors[color][300],
					},
				},
			},
			MuiTableCell: {
				root: {
					padding: '0px 8px'
				}
			},
			MuiInput: {
				underline: {
					'&:hover:not($disabled):not($focused):not($error):before': {
						borderBottom: `2px solid ${colors[color][500]}`,
					},
					'&:after': {
						borderBottomColor: colors[color][500],
					},
				},
			},
			MuiInputLabel: {
				outlined: {
					transform: 'translate(14px, 14px) scale(1)'
				},
			},
			MuiOutlinedInput: {
				input: {
					padding: '12px 14px'
				}
			}
		},
		palette: {
			type: 'dark',
			primary: {
				main: colors[color][400],

			},
			secondary: {
				main: secondaryColor,
				light: hoverColor,
			},
			error: {
				main: colors['red'][400]
			}
		},
	})
	return theme
};
export default theme