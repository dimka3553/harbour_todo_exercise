import { MyLists, TodoList } from '@/components/MyLists';
import { gql } from 'graphql-request';
import { client } from '@/lib/client';
import { MY_EMAIL_KEY } from '../constants/email';

const GET_TODO_LISTS_QUERY = gql`
  query GetTODOLists($email: String!) {
    getTODOLists(email: $email) {
      id
      name
    }
  }
`;

export default async function Home() {
  const { getTODOLists } = await client.request<{ getTODOLists: TodoList[] }>(
    GET_TODO_LISTS_QUERY,
    {
      email: MY_EMAIL_KEY,
    },
  );

  console.log('getTODOLists', getTODOLists);
  return (
    <div className="p-8 flex items-center flex-col">
      <div className="w-full max-w-[500px]">
        <MyLists list={getTODOLists ?? []} />
      </div>
    </div>
  );
}
