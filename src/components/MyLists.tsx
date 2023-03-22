'use client';

import Link from 'next/link';
import classNames from 'classnames';
import { CreateList } from '@/components/CreateList';
import { randomColor } from '@/utils/randomColor';
import { useState } from 'react';
import { gql } from 'graphql-request';
import { client } from '@/lib/client';

export type TodoList = {
  id: number;
  created_at: string;
  name: string;
  email: string;
};

type MyListsProps = {
  list: TodoList[];
};

export const MyLists = ({ list = [] }: MyListsProps) => {
  const [todoLists, setTodoLists] = useState<TodoList[]>(list);

  const onCreateHandler = (newTodoList: TodoList) => {
    setTodoLists([...todoLists, newTodoList]);
  };

  const onDeletedHandler = (id: Number) => {
    // TODO: delete list with query
    // Update state with new list
    const DELETE_TODO_LIST_QUERY = gql`
      mutation DeleteTODOList($deleteTODOListId: Int!) {
        deleteTODOList(id: $deleteTODOListId)
      }
    `;

    client.request(DELETE_TODO_LIST_QUERY, {
      deleteTODOListId: id,
    });

    setTodoLists(todoLists.filter((item) => item.id !== id));
  };

  return (
    <div className="flex flex-col gap-8 text-center">
      <h1 className="text-4xl">
        {todoLists.length > 0 ? 'My TODO lists' : 'No lists yet!'}
      </h1>
      <ul className="flex flex-col gap-4">
        {todoLists.map((item) => (
          <li key={item.id} className="flex items-center gap-4">
            <Link
              href={item.id.toString()}
              className={classNames(
                'py-2 pl-4 pr-2 bg-gray-900 w-full rounded-lg flex justify-between items-center min-h-16 text-black hover:scale-[1.02] transform transition duration-300 ease-in-out',
                randomColor(),
              )}
            >
              {item.name}
            </Link>
            <button onClick={() => onDeletedHandler(item.id)}>❌</button>
          </li>
        ))}
      </ul>
      <CreateList onCreate={onCreateHandler} />
    </div>
  );
};
