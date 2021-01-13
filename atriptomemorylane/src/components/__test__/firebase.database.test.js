import FirestoreMock from './firestore.mock'
import firebase from 'firebase/app'
import 'firebase/firestore'

describe('setup', () => {
    const firestoreMock = new FirestoreMock()
    beforeEach(() => {
        firebase.firestore = firestoreMock
        firestoreMock.reset()
    })

    it('push to database', (done) => {
        firestoreMock.mockAddReturn = { id: 'test-id' }
        firebase.firestore.collection('test')
          .add({test: 'test'})
          .then(res => {
            expect(firestoreMock.mockCollection).toBeCalledWith('test')
            expect(firestoreMock.mockAdd).toBeCalledWith({test: 'test'})
            expect(res.id).toEqual('test-id')
            done()
          })
          .catch(done)
    })
})