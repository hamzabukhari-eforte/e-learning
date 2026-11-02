"use client";

import { ModulePage } from "@/components/system-setup/module-page";
import { SendFormFields } from "@/components/survey/send-form/send-form-fields";
import { SentFormsTable } from "@/components/survey/send-form/sent-forms-table";
import { useSendForm } from "@/components/survey/send-form/use-send-form";

export function SendFormModule() {
  const {
    values,
    setValues,
    employees,
    forms,
    pending,
    error,
    list,
    handleSubmit,
    getExportRows,
  } = useSendForm();

  return (
    <ModulePage
      title="Send Form"
      entityLabel="Form"
      formTitle="Send Form"
      sectionLabel="Survey"
      form={
        <SendFormFields
          values={values}
          employees={employees}
          forms={forms}
          pending={pending}
          error={error}
          onChange={setValues}
          onSubmit={handleSubmit}
        />
      }
      table={
        <SentFormsTable
          rows={list.rows}
          page={list.page}
          pageSize={list.pageSize}
          totalPages={list.totalPages}
          total={list.total}
          search={list.search}
          onSearchChange={list.updateSearch}
          onPageChange={list.setPage}
          onPageSizeChange={list.updatePageSize}
          getExportRows={getExportRows}
        />
      }
    />
  );
}
