import { Tooltip } from '@/components/ui/core/tooltip';
import { InformationCircleIcon } from '@heroicons/react/solid';
import { Meta } from '@storybook/react';
export default {
  title: 'Atoms/Tooltip',
  component: Tooltip,
} as Meta;

export const Default = () => {
  return (
    <div className='align-center flex justify-center pt-[100px]'>
      <Tooltip
        placement='bottom-end'
        icon={InformationCircleIcon}
        arrowClassName={'-top-7'}
        arrowShape={'polygon(100% 0, 0% 100%, 100% 100%)'}
        hasArrow={false}
      >
        <>Hello world</>
      </Tooltip>
    </div>
  );
};
