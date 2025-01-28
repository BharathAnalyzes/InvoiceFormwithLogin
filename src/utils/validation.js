// src/utils/validation.js
import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required')
});

export const invoiceValidationSchema = Yup.object({
  vendor: Yup.string().required('Vendor is required'),
  poNumber: Yup.string().required('Purchase Order Number is required'),
  invoiceNumber: Yup.string().required('Invoice Number is required'),
  invoiceDate: Yup.date().required('Invoice Date is required'),
  totalAmount: Yup.number()
    .required('Total Amount is required')
    .min(0, 'Amount must be positive'),
  paymentTerms: Yup.string().required('Payment Terms are required'),
  dueDate: Yup.date().required('Due Date is required'),
  glPostDate: Yup.date().required('GL Post Date is required'),
  description: Yup.string().required('Description is required'),
  lineAmount: Yup.number().required('Line Amount is required').min(0),
  department: Yup.string().required('Department is required'),
  account: Yup.string().required('Account is required'),
  location: Yup.string().required('Location is required')
});