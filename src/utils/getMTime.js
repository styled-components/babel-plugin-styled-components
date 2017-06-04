import { statSync } from 'fs'

export default filename => statSync(filename).mtime.getTime().toString()
