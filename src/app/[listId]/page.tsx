import { Todos } from '@/components/Todos';
import { client } from '@/lib/client';
import { gql } from 'graphql-request';
import { MY_EMAIL_KEY } from './../../constants/email';

type MyListPageMetadata = {
  params: { listId: string };
};

export async function generateMetadata({ params }: MyListPageMetadata) {
  return {
    title: `TODO List ${params.listId}`,
  };
}

type MyListPageProps = MyListPageMetadata;

export default async function MyListPage({
  params: { listId },
}: MyListPageProps) {
  const GET_TODOS_QUERY = gql`
    query GetTodos($listId: Int!) {
      getTODOs(listId: $listId) {
        desc
        finished
        id
        todo_list_id
      }
    }
  `;

  const { getTODOs } = await client.request<{ getTODOs: any }>(
    GET_TODOS_QUERY,
    {
      listId: parseInt(listId),
    },
  );

  console.log(getTODOs);

  return (
    <div className="flex align-center justify-center p-16 sm:p-8">
      <Todos
        listId={parseInt(listId)}
        // TODO swap with real data from query and
        // make sure to make the query from the server
        list={getTODOs ?? []}
      />
    </div>
  );
}
