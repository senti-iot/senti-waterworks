import { createMuiTheme, darken } from '@material-ui/core/styles'
import { red, orange, pink, blue } from '@material-ui/core/colors'
import override from './override'
import * as colors from '@material-ui/core/colors';
import hexToRgba from 'hex-to-rgba';
import { bgColors } from 'Styles/backgroundColors'; import {  /* headerColor */ } from 'Styles/mainStyles'


const theme = createMuiTheme({
	...override('blue'),
	palette: {
		primary: {
			main: blue[500],
			light: blue[300],
		},
		secondary: {
			main: orange[500],
			light: orange[300],
		},
		error: {
			main: red[400]
		}
	},
	appBackground: bgColors['blue'].background,
	boxBackground: darken(hexToRgba(colors['blue'][700], 0.7), 0.5),
	textColor: '#fff',
	primary: blue[500],
	activeButton: orange[500],
	mainButton: pink[500]
});

export default theme

// background color: #F44336
// Boxes color: #BA000D
// not actives buttons:  #790008
// actives buttons: stays oranges
// background color: #E91E63



// Boxes color:   #B0003A
// not actives buttons:  #840D31

// actives buttons: stays orangesbackground color: #9c27b0

// Boxes color:  #6a0080

// not actives buttons:  #390345
// actives buttons: stays orangesbackground color: #673ab7

// Boxes color:  #320b86

// not actives buttons:  #10012F

// actives buttons: stays orangesbackground color: #3f51b5

// Boxes color:  #002984

// not actives buttons:  #04153A

// actives buttons: stays oranges

//All the blue color variations keep the ordinal colors on the buttonsbackground color: #009688

// Boxes color:  #00675b

// not actives buttons:  #01302B

// actives buttons: stays orangesbackground color: #4caf50

// Boxes color:  #087f23

// not actives buttons:  #033D11

// actives buttons: stays orangesbackground color: #8bc34a

// Boxes color #5a9216

// not actives buttons:  #34560A

// actives buttons: stays orangesbackground color: #cddc39

// Boxes color #99aa00

// not actives buttons:  #596302

// actives buttons: stays orangesbackground color: #ffeb3b

// Boxes color #c8b900

// not actives buttons:  #6C6401

// actives buttons: #FA6400
// background color: #ff7043

// Boxes color: #c63f17

// not actives buttons:  # 790008
// actives buttons: stays oranges
// Skærmbillede 2019-10-08 kl. 11.09.33.png
// Skærmbillede 2019-10-08 kl. 11.09.33.png
// background color: #ffca28

// Boxes color #c79a00

// not actives buttons:  #6E5708

// actives buttons: #184C84
// Graf colors:
// Light blue: #18D3F9

// Medium blue: #0091FF

// Dark blue: #184C84
// background color: #ffa726

// Boxes color #c77800

// not actives buttons #694002

// actives buttons: #184C84

// Same graph colors as yellow