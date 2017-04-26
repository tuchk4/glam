import { StyleSheet } from './sheet'
import hashArray from './hash'

export const sheet = new StyleSheet()
sheet.inject()

let inserted = {}

function dynamic(cls, vars){
  let hash = hashArray(vars)
  if(inserted[hash]) {
    return `vars-${hash}`
  }
  
  let src = vars.map((val, i) => `--${cls}-${i}: ${val}`).join('; ')
  sheet.insert(`.vars-${hash} {${src}}`)  
  inserted[hash] = true

  return `vars-${hash}`

}

export function flush(){
  sheet.flush()
  inserted = {}
  sheet.inject()
}

export default function css(cls, vars){
  return cls + (vars && vars.length > 0 ?  (' ' + dynamic(cls, vars)) : '')
}