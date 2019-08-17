import { equal, ok } from 'zoroaster/assert'
import Context from '../context'
import github from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof github, 'function')
  },
  async 'calls package without error'() {
    await github()
  },
  async 'gets a link to the fixture'({ FIXTURE }) {
    const res = await github({
      text: FIXTURE,
    })
    ok(res, FIXTURE)
  },
}

export default T