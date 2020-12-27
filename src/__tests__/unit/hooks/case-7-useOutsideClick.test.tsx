import React, { useRef, useState } from 'react'
import { render, fireEvent } from '@testing-library/react'

import useOutsideClick from '../../../hooks/useOutsideClick'

describe('The useOutsideClick hook', () => {
 const TogglePanelButton = () => {
   const [showing, setShowing] = useState(true);

   return(
     <div >
       <button onClick={() => setShowing(false)} data-testid="togglePanelButton">Panel Button</button>
       {showing ? <Panel /> : null}
     </div>
   )
 }

  const Panel = () => {
    const ref = useRef(null);
    const [showing, setShowing] = useState(false);

     useOutsideClick (ref, () => {
       setShowing(!showing);
     })

     return(
       <div ref={ref}>
         <button data-testid="panelButton">
           {showing ? 'SHOW BUTTON': 'HIDE BUTTON'}
         </button>
       </div>
     )
  }
  it('calls the outside click handler when an outside click is initiated', () => {
     const {getByTestId} = render(
       <div>
         <button data-testid="outsidePanelButton">outside</button>
         <Panel />
       </div>
     )
     
     expect(getByTestId('panelButton')).toHaveTextContent('HIDE BUTTON')
     fireEvent.click(getByTestId('outsidePanelButton'))
     expect(getByTestId('panelButton')).toHaveTextContent('SHOW BUTTON')
    
  })

  it('cleans up the event listeners after component is unmounted', () => {
    const removeEventListener = jest.spyOn(document, 'removeEventListener');
    const {getByTestId} = render(<TogglePanelButton />);
    fireEvent.click(getByTestId('togglePanelButton'));
    expect(removeEventListener).toHaveBeenCalledTimes(1);
  })
})
