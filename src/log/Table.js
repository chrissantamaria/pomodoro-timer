import React from "react";
import MaterialTable from "material-table";

export default function Table(props) {
  const { sessions, /* updateSession, */ removeSession } = props;
  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        data={sessions}
        columns={[
          { title: "Type", field: "sessionType" },
          { title: "Description", field: "description" },
          { title: "Date", field: "date", type: "date", editable: "never" },
          { title: "Time", field: "date", type: "time", editable: "never" }
        ]}
        title="Timer logs"
        options={{ actionsColumnIndex: -1 }}
        editable={{
          // Disabling until a fix is found for improper date formatting when in cell edit mode
          // onRowUpdate: async data => {
          //   // Stripping "tableData" property from oldSession that comes from material-table
          //   const { tableData, key, ...session } = data;
          //   updateSession({ session, key });
          //   return;
          // },
          onRowDelete: async data => {
            removeSession(data.key);
            return;
          }
        }}
      />
    </div>
  );
}
