import { getNodeLabel } from '@ory/integrations/ui';

import { NodeInputProps } from './helpers';

export function NodeInputButton<T>({
  node,
  attributes,
  setValue,
  disabled,
  dispatchSubmit,
}: NodeInputProps) {
  // Some attributes have dynamic JavaScript - this is for example required for WebAuthn.
  const onClick = () => {
    // This section is only used for WebAuthn. The script is loaded via a <script> node
    // and the functions are available on the global window level. Unfortunately, there
    // is currently no better way than executing eval / function here at this moment.
    if (attributes.onclick) {
      const run = new Function(attributes.onclick);
      run();
    }
  };

  return (
    <>
      <button
        className="p-2 border border-indigo-500 hover:bg-indigo-500 hover:text-white duration-100 ease-in-out w-2/12 text-indigo-500 flex flex-row justify-center items-center gap-1"
        name={attributes.name}
        onClick={(e) => {
          onClick();
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
