import { useRef } from 'react'
import useOnClickOutside from '~/hooks/useOnClickOutside'
export default function Modal(props) {
  let ref = useRef()
  useOnClickOutside(ref, props.onClickOutside)

  return (
    <div className={`fixed z-10 inset-0 overflow-y-auto ${props.className}`}>
  <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <div className="fixed inset-0 transition-opacity">
      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
    </div>

    <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
    <div ref={ref} className="inline-block align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
      {props.children}
    </div>
  </div>
</div>
  )
}
