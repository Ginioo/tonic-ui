import { ariaAttr } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { Collapse } from '../transitions';
import useAccordionItem from './useAccordionItem';

const AccordionContent = forwardRef((inProps, ref) => {
  const {
    TransitionComponent = Collapse,
    TransitionProps,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'AccordionContent' });
  const context = useAccordionItem(); // context might be an undefined value

  if (!context) {
    return (
      <Box ref={ref} {...rest} />
    );
  }

  return (
    <TransitionComponent
      appear={false} // do not perform the enter transition when it first mounts
      {...TransitionProps}
      aria-hidden={ariaAttr(!context?.isExpanded)}
      aria-labelledby={context?.accordionToggleId}
      id={context?.accordionContentId}
      in={context?.isExpanded}
      ref={ref}
      role="region"
      {...rest}
    />
  );
});

AccordionContent.displayName = 'AccordionContent';

export default AccordionContent;
