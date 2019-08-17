/* alanode example/ */
import github from '../src'

(async () => {
  const res = await github({
    text: 'example',
  })
  console.log(res)
})()