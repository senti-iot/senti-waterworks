import { red, green, yellow } from '@material-ui/core/colors'

const colorFunc = (status) => {
	switch (status) {
		case 0: {
			return { primary: red[700], secondary: red[100] }
		}
		case 1: {
			return { primary: yellow[600], secondary: yellow[100] }
		}
		case 2: {
			return { primary: green[700], secondary: green[100] }
		}
		default:
			return { primary: green[700], secondary: green[100] }
	}
}

export const MarkerIcon = (status) => {
	let color = colorFunc(status)
	return (`<?xml version='1.0' encoding='UTF-8' standalone='no'?>
<svg
   xmlns:dc='http://purl.org/dc/elements/1.1/'
   xmlns:cc='http://creativecommons.org/ns#'
   xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns#'
   xmlns:svg='http://www.w3.org/2000/svg'
   xmlns='http://www.w3.org/2000/svg'
   id='svg6'
   version='1.1'
   viewBox='0 0 24 24'
   height='24'
   width='24'>
  <metadata
     id='metadata12'>
    <rdf:RDF>
      <cc:Work
         rdf:about=''>
        <dc:format>image/svg+xml</dc:format>
        <dc:type
           rdf:resource='http://purl.org/dc/dcmitype/StillImage' />
        <dc:title></dc:title>
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <defs
     id='defs10' />
  <path
     id='path2'
     fill='none'
     d='M0 0h24v24H0z' />
  <path
	 id='path4'
	 style='fill:${color.primary}'
     d='M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z' />
  <path
     id='path822'
     d='M 7.0293273,12.003107 V 5.0286315 H 12 16.970673 v 6.9744755 6.974475 H 12 7.0293273 Z'
     style='fill:${color.secondary};fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:0.0310667' />
</svg>
`)
}

export const waterMeter = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUg
AAAgAAAAIACAYAAAD0eNT6AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAFHGlUWHRYTUw6Y29tL
mFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZW
hpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bX
B0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmR
mOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2Ny
aXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJod
HRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3
Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh
0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQ
aG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIxLTEwLTEzVDEwOjQwOjAxKzAyOjAwIiB4b
XA6TW9kaWZ5RGF0ZT0iMjAyMS0xMS0wM1QwMDoxNTo1MSswMTowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMS0xMS0wM1QwMD
oxNTo1MSswMTowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0N
Qcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpjN2Y4MThkNy1iMDMyLTMxNDkt
YmM1OS1mYTVlMjliMjc0NzgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6YzdmODE4ZDctYjAzMi0zMTQ5LWJjNTktZmE1Z
TI5YjI3NDc4IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6YzdmODE4ZDctYjAzMi0zMTQ5LWJjNTktZmE1ZT
I5YjI3NDc4Ij4gPHhtcE1NOkhpc3Rvcnk + IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFd
nQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpjN2Y4MThkNy1iMDMyLTMxNDktYmM1OS1mYTVlMjliMjc0NzgiIHN0RXZ0OndoZW49Ij
IwMjEtMTAtMTNUMTA6NDA6MDErMDI6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5ICh
XaW5kb3dzKSIvPiA8L3JkZjpTZXE + IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24 + IDwvcmRmOlJERj4g
PC94OnhtcG1ldGE + IDw / eHBhY2tldCBlbmQ9InIiPz52wCJ1AAA8l0lEQVR4nO3deZxddX3 / 8ff33Dt7ZjKZSTKZ7Du
BsAdZIwoC2aBQNWirVltbrNUkYKu1kMA1BFraKpBBXPvT1rpFrSgkmSAQBQWJRNYsZCEr2Sczmcns957v748ksoWQSWbmc +
49r + fjwUPkoXzfMHPPed / v + Z7v13nvBQAA4iWwDgAAAHofBQAAgBiiAAAAEEMUAAAAYogCAABADFEAAACIIQoAAAAxR
AEAACCGKAAAAMQQBQAAgBiiAAAAEEMUAAAAYogCAABADFEAAACIIQoAAAAxRAEAACCGKAAAAMQQBQAAgBiiAAAAEEMUAAAAYo
gCAABADFEAAACIIQoAAAAxRAEAACCGKAAAAMQQBQAAgBiiAAAAEEMUAAAAYogCAABADFEAAACIIQoAAAAxRAEAACCGKAAAAMQ
QBQAAgBiiAAAAEEMUAAAAYogCAABADFEAAACIIQoAAAAxRAEAACCGKAAAAMQQBQAAgBiiAAAAEEMUAAAAYogCAABADFEAAACI
IQoAAAAxRAEAACCGKAAAAMQQBQAAgBiiAAAAEEMUAAAAYogCAABADFEAAACIIQoAAAAxRAEAACCGKAAAAMQQBQAAgBiiAAAAE
EMUAAAAYogCAABADFEAAACIIQoAAAAxRAEAACCGKAAAAMQQBQAAgBiiAAAAEEMUAAAAYogCAABADFEAAACIIQoAAAAxRAEAAC
CGKAAAAMQQBQAAgBiiAAAAEEMUAAAAYogCAABADFEAAACIIQoAAAAxRAEAACCGKAAAAMQQBQAAgBiiAAAAEEMUAAAAYogCAAB
ADFEAAACIIQoAAAAxRAEAACCGKAAAAMQQBQAAgBiiAAAAEEMUAAAAYogCAABADFEAAACIIQoAAAAxlDzaX3TO9XYOAF104x21
1T7jh2a8759wrtI7VymFlXKu0ntXGcgP8FJfSUk5lUqSvIokFR7 + W5RJSkgKJR049Jd8h5xrPvSnvkVy7ZLqnFTnpf3Ou7o
w8HWSr / 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`
export default MarkerIcon
