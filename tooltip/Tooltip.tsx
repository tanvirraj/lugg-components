import { Panel } from '@/components/ui/shared/panel';
import { Popover } from '@headlessui/react';
import PopperJS from '@popperjs/core';
import cx from 'clsx';
import React, { useState } from 'react';
import { usePopper } from 'react-popper';

export interface TooltipProps {
  children: React.ReactNode;
  icon: React.ComponentType<any> | React.ReactElement<any>;
  placement: PopperJS.Placement;
  arrowClassName: string;
  arrowShape: React.CSSProperties['clipPath'];
  hasArrow?: boolean;
}

function Tooltip({
  children,
  icon,
  placement,
  arrowClassName,
  arrowShape,
  hasArrow,
}: TooltipProps) {
  const [poperParent, setPoperParent] = useState<HTMLButtonElement | null>(
    null
  );
  const [poperPanel, setPoperPanel] = useState<HTMLDivElement | null>(null);
  const [poperArrow, setPoperArrow] = useState<HTMLSpanElement | null>(null);
  const { styles, attributes } = usePopper(poperParent, poperPanel, {
    placement: placement,
    modifiers: [
      {
        name: 'arrow',
        options: {
          element: poperArrow,
          padding: 0,
        },
      },
      {
        name: 'offset',
        options: {
          offset: [-20, 6],
        },
      },
    ],
  });

  return (
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button
            ref={setPoperParent}
            className='border-none outline-none'
          >
            <Panel.Icon icon={icon} className='w-19' />
          </Popover.Button>

          <Popover.Panel
            ref={setPoperPanel}
            style={styles.popper}
            className='absolute  z-10'
            {...attributes.popper}
          >
            {hasArrow && (
              <>
                {open && (
                  <span
                    ref={setPoperArrow}
                    className={cx(
                      'block h-[20px] w-[20px] bg-white shadow-[0px_8px_16px_rgba(31,38,82,0.08)]',
                      arrowClassName
                    )}
                    style={{
                      ...styles.arrow,
                      clipPath: arrowShape,
                    }}
                  />
                )}
              </>
            )}

            <div className='rounded-md bg-white px-[32px] py-[18px] shadow-[0px_8px_16px_rgba(31,38,82,0.08)]'>
              {children}
            </div>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
}

Tooltip.defaultProps = {
  place: 'bottom',
  hasArrow: true,
};

export { Tooltip };
