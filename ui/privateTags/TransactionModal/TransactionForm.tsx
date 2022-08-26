import {
  Box,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useCallback, useState } from 'react';
import type { SubmitHandler, ControllerRenderProps } from 'react-hook-form';
import { useForm, Controller } from 'react-hook-form';

import type { TransactionTag } from 'types/api/account';

import { TRANSACTION_HASH_LENGTH, TRANSACTION_HASH_REGEXP } from 'lib/validations/transaction';
import TagInput from 'ui/shared/TagInput';
import TransactionInput from 'ui/shared/TransactionInput';

const TAG_MAX_LENGTH = 35;

type Props = {
  data?: TransactionTag;
  onClose: () => void;
}

type Inputs = {
  transaction: string;
  tag: string;
}

const TransactionForm: React.FC<Props> = ({ data, onClose }) => {
  const [ pending, setPending ] = useState(false);
  const formBackgroundColor = useColorModeValue('white', 'gray.900');

  const { control, handleSubmit, formState: { errors } } = useForm<Inputs>({
    mode: 'all',
    defaultValues: {
      transaction: data?.transaction_hash || '',
      tag: data?.name || '',
    },
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation((formData: Inputs) => {
    const body = JSON.stringify({
      name: formData?.tag,
      transaction_hash: formData?.transaction,
    });
    const isEdit = data?.id;

    if (isEdit) {
      return fetch(`/api/account/private-tags/transaction/${ data.id }`, { method: 'PUT', body });
    }

    return fetch('/api/account/private-tags/transaction', { method: 'POST', body });
  }, {
    onError: () => {
      // eslint-disable-next-line no-console
      console.log('error');
    },
    onSuccess: () => {
      queryClient.refetchQueries([ 'transaction' ]).then(() => {
        onClose();
        setPending(false);
      });
    },
  });

  const onSubmit: SubmitHandler<Inputs> = formData => {
    setPending(true);
    // api method for editing is not implemented now!!!
    mutate(formData);
  };

  const renderTransactionInput = useCallback(({ field }: {field: ControllerRenderProps<Inputs, 'transaction'>}) => {
    return <TransactionInput field={ field } isInvalid={ Boolean(errors.transaction) } backgroundColor={ formBackgroundColor }/>;
  }, [ errors, formBackgroundColor ]);

  const renderTagInput = useCallback(({ field }: {field: ControllerRenderProps<Inputs, 'tag'>}) => {
    return <TagInput field={ field } isInvalid={ Boolean(errors.tag) } backgroundColor={ formBackgroundColor }/>;
  }, [ errors, formBackgroundColor ]);

  return (
    <>
      <Box marginBottom={ 5 }>
        <Controller
          name="transaction"
          control={ control }
          rules={{
            maxLength: TRANSACTION_HASH_LENGTH,
            minLength: TRANSACTION_HASH_LENGTH,
            pattern: TRANSACTION_HASH_REGEXP,
          }}
          render={ renderTransactionInput }
        />
      </Box>
      <Box marginBottom={ 8 }>
        <Controller
          name="tag"
          control={ control }
          rules={{
            maxLength: TAG_MAX_LENGTH,
          }}
          render={ renderTagInput }
        />
      </Box>
      <Box marginTop={ 8 }>
        <Button
          size="lg"
          variant="primary"
          onClick={ handleSubmit(onSubmit) }
          disabled={ Object.keys(errors).length > 0 }
          isLoading={ pending }
        >
          { data ? 'Save changes' : 'Add tag' }
        </Button>
      </Box>
    </>
  );
};

export default TransactionForm;