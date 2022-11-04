import type { NextPage } from 'next';
import React from 'react';

import type { PageParams } from 'lib/next/tx/types';

import TransactionNextPage from 'lib/next/tx/TransactionNextPage';

type Props = {
  pageParams: PageParams;
}

const TransactionPage: NextPage<Props> = ({ pageParams }: Props) => {
  return (
    <TransactionNextPage pageParams={ pageParams }/>
  );
};

export default TransactionPage;

export { getServerSideProps } from 'lib/next/getServerSideProps';