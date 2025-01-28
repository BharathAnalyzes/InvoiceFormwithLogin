import React from "react";

const InvoiceDetails = ({ handleChange, values, errors, touched }) => {
  return (
    <div className="mb-4">
      <label htmlFor="invoiceNumber">Invoice Number:</label>
      <input
        type="text"
        id="invoiceNumber"
        name="invoiceNumber"
        value={values.invoiceNumber}
        onChange={handleChange}
        className={`border rounded p-2 w-full ${touched.invoiceNumber && errors.invoiceNumber ? "border-red-500" : ""}`}
      />
      {touched.invoiceNumber && errors.invoiceNumber && (
        <span className="text-red-500">{errors.invoiceNumber}</span>
      )}
    </div>
  );
};

export default InvoiceDetails;