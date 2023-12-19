import Spinner from 'react-bootstrap/Spinner';

const Preloader = e => (
  <div className='text-center py-5 my-5'>
    <Spinner variant="primary" size="xl" />
  </div>
)

export default Preloader