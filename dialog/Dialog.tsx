import { Dialog as HeadlessDialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { Fragment } from 'react';
import { BaseButton } from '../buttons';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

function Dialog({ isOpen, onClose, children }: Props) {
  return (
    <Transition appear show={!!isOpen} as={Fragment}>
      <HeadlessDialog
        as='div'
        className='fixed inset-0 z-50 overflow-y-auto'
        onClose={onClose}
      >
        <div className='min-h-screen px-16 text-center'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <HeadlessDialog.Overlay className='fixed inset-0 bg-brand-1500/50' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className='inline-block h-screen align-middle'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <div className='my-32 inline-block w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-40 text-left align-middle shadow-xl transition-all'>
              <div className='relative'>
                {children}
                <div className='absolute top-0 right-0 translate-x-14 -translate-y-14'>
                  <BaseButton
                    className='text-gray-400 hover:text-gray-600'
                    onClick={onClose}
                  >
                    <XIcon className='w-28 ' />
                  </BaseButton>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </HeadlessDialog>
    </Transition>
  );
}

const Elements = Object.assign(Dialog, {
  Title: HeadlessDialog.Title,
  Description: HeadlessDialog.Description,
});

export { Elements as Dialog };
