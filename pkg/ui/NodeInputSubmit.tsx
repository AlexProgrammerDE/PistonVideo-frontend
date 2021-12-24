import { getNodeLabel } from '@ory/integrations/ui';

import { NodeInputProps } from './helpers';

export function NodeInputSubmit<T>({
  node,
  attributes,
  setValue,
  disabled,
  dispatchSubmit,
}: NodeInputProps) {
  return (
    <>
      <button
        className="p-2 border border-indigo-500 hover:bg-indigo-500 hover:text-white duration-100 ease-in-out w-2/12 text-indigo-500 flex flex-row justify-center items-center gap-1"
        name={attributes.name}
        onClick={(e) => {
          // On click, we set this value, and once set, dispatch the submission!
          setValue(attributes.value).then(() => dispatchSubmit(e));
        }}
        value={attributes.value || ''}
        disabled={attributes.disabled || disabled}
      >
        {getNodeLabel(node)}
      </button>
    </>
  );
}
