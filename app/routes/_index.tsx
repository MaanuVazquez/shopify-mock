import { Form } from '@remix-run/react'

export default function Index() {
  return (
    <div className='hero min-h-screen bg-base-200'>
      <div className='hero-content text-center'>
        <div className='max-w-md'>
          <h1 className='text-4xl font-bold'>Welcome to BLOO</h1>
          <Form method='get' action='/search'>
            <div className='join mt-10'>
              <div>
                <div>
                  <input className='input join-item' placeholder='Im looking for...' />
                </div>
              </div>
              <button className='btn btn-primary join-item'>Find out!</button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}
