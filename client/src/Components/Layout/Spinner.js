import React, {Fragment} from 'react'
import spinner from '../../img/spinner.gif';

export const Spinner = () => (
   <Fragment>
      <img
         src={spinner}
         style={{ width: '200px', margin: 'auto', display: 'block' }}
         alt='Loading'
      />
   </Fragment>
)

