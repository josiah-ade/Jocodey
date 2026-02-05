// "use client";

// import {
//   useReactTable,
//   getCoreRowModel,
//   flexRender,
//   ColumnDef,
// } from "@tanstack/react-table";
// import React from "react";

// interface TableProps<T> {
//   data: T[];
//   columns: ColumnDef<T, unknown>[];
// }

// export default function Table<T>({ data, columns }: TableProps<T>) {
//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     columnResizeMode: "onChange",
//     defaultColumn: {
//       size: 150,
//     },
//   });

//   return (
//     <div className="w-full">
//       {/* Desktop Table */}
//       <div className=" rounded-xl overflow-x-auto shadow">
//         <table className="min-w-full  text-sm text-left">
//           <thead className="bg-darker-bg  text-white uppercase text-xs">
//             {table.getHeaderGroups().map((headerGroup) => (
//               <tr key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <th
//                     key={header.id}
//                     className="py-4 px-6"
//                     style={{ width: header.getSize() }}
//                   >
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(
//                           header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody className="divide-y divide-border2 text-gray-text border border-border2">
//             {table.getRowModel().rows.map((row) => (
//               <tr
//                 key={row.id}
//                 className="hover:bg-[var(--darker-bg)] transition"
//               >
//                 {row.getVisibleCells().map((cell) => (
//                   <td
//                     key={cell.id}
//                     className="py-4 px-6"
//                     style={{ width: cell.column.getSize() }}
//                   >
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  ColumnSizingState,
} from "@tanstack/react-table";
import React from "react";

interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T, unknown>[];
}

export default function Table<T>({ data, columns }: TableProps<T>) {
  // state for column sizes
  const [columnSizing, setColumnSizing] = React.useState<ColumnSizingState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
    state: {
      columnSizing,
    },
    onColumnSizingChange: setColumnSizing,
    defaultColumn: {
      size: 150, // fallback width
    },
  });

  return (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="rounded-xl overflow-x-auto shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-darker-bg text-white uppercase text-xs">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="py-4 px-4"
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-border2 text-gray-text border border-border2">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-[var(--darker-bg)] transition"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="py-4 px-4"
                    style={{ width: cell.column.getSize() }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
