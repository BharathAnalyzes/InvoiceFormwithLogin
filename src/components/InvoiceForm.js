// src/components/invoice/InvoiceForm.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Upload, Menu } from 'lucide-react';
import { useAuth } from '../utils/AuthContext';
import { purchaseOrders, departments, accounts, locations } from '../utils/formData';

// Add styles for animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    0% {
      transform: translateY(100%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Validation schema for form fields
const validationSchema = Yup.object().shape({
  vendor: Yup.string().required('Vendor is required'),
  poNumber: Yup.string().required('Purchase Order Number is required'),
  invoiceNumber: Yup.string().required('Invoice Number is required'),
  invoiceDate: Yup.string().required('Invoice Date is required'),
  totalAmount: Yup.number().required('Total Amount is required').min(0),
  paymentTerms: Yup.string().required('Payment Terms are required'),
  lineAmount: Yup.number().required('Line Amount is required').min(0),
  department: Yup.string().required('Department is required'),
  account: Yup.string().required('Account is required'),
  location: Yup.string().required('Location is required'),
  expenseDescription: Yup.string().required('Description is required'),
  comments: Yup.string().nullable()
});

const InvoiceForm = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activeSection, setActiveSection] = useState('vendor');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);

  // Refs for scrolling
  const vendorRef = useRef(null);
  const invoiceRef = useRef(null);
  const commentsRef = useRef(null);

  // Initial form values
  const initialValues = {
    vendor: '',
    poNumber: '',
    invoiceNumber: '',
    invoiceDate: '',
    totalAmount: '',
    paymentTerms: '',
    dueDate: '',
    glPostDate: '',
    lineAmount: '',
    department: '',
    account: '',
    location: '',
    expenseDescription: '',
    comments: ''
  };

  // Load saved form data
  useEffect(() => {
    const savedData = localStorage.getItem('invoiceData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        Object.assign(initialValues, parsedData);
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleFileUpload = (file) => {
    setUploadedFile(file);
    console.log('File uploaded:', file.name);
  };

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const refs = {
      vendor: vendorRef,
      invoice: invoiceRef,
      comments: commentsRef
    };

    refs[sectionId]?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  const showSuccessMessage = () => {
    setIsSuccessVisible(true);
    setTimeout(() => {
      setIsSuccessVisible(false);
    }, 3000);
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log('Form submission started with values:', values);
      setSubmitting(true);

      // Save to localStorage
      localStorage.setItem('invoiceData', JSON.stringify(values));
      console.log('Data saved to localStorage');

      // Show success message
      setSubmitted(true);
      showSuccessMessage();
      
      // Reset form
      resetForm();
      setUploadedFile(null);
      
      console.log('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="text-gray-600 mr-4">
            ←
          </button>
          <h1 className="text-xl font-semibold">Create New Invoice</h1>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-red-500 hover:text-red-600"
        >
          Logout
        </button>
      </div>

      {/* Navigation */}
      <div className="flex gap-6 border-b mb-8 justify-end">
        {['vendor', 'invoice', 'comments'].map((section) => (
          <button
            key={section}
            onClick={() => scrollToSection(section)}
            className={`pb-2 ${
              activeSection === section
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-600'
            }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)} Details
          </button>
        ))}
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, errors, touched, isSubmitting }) => (
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Upload Section */}
            <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center min-h-[400px]">
              <h2 className="text-lg font-semibold mb-2">Upload Your Invoice</h2>
              <p className="text-gray-500 mb-8">To auto-populate fields and save time</p>
              
              <div className="bg-blue-500 rounded-full p-8 mb-8">
                <div className="bg-white p-4 rounded-lg w-16 h-16 flex items-center justify-center">
                  {uploadedFile ? (
                    <div className="text-green-500 text-2xl">✓</div>
                  ) : (
                    <Upload className="text-blue-500" size={24} />
                  )}
                </div>
              </div>

              <label className="cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e.target.files[0])}
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
                />
                <div className="border rounded-lg px-4 py-2 mb-2 hover:bg-gray-50">
                  <Upload className="inline-block mr-2" size={16} />
                  Upload File
                </div>
              </label>
              <p className="text-sm text-blue-500">Click to upload</p>
              <p className="text-sm text-gray-500">or Drag and drop</p>
            </div>

            {/* Right Column - Form Fields */}
            <div className="space-y-8">
              {/* Vendor Details Section */}
              <div ref={vendorRef} className="mb-8 scroll-mt-20">
                <h3 className="flex items-center text-lg font-semibold mb-4">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none">
                    <rect width="20" height="20" x="2" y="2" rx="2" className="fill-blue-100"/>
                  </svg>
                  Vendor Details
                </h3>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-4">Vendor Information</h4>
                  <div className="mb-4">
                    <label className="block text-sm mb-1">
                      Vendor <span className="text-red-500">*</span>
                    </label>
                    <Field
                      as="select"
                      name="vendor"
                      className={`w-full border rounded-lg p-2 ${
                        errors.vendor && touched.vendor ? 'border-red-500' : ''
                      }`}
                    >
                      <option value="">Select Vendor</option>
                      <option value="A-1">A - 1 Exterminators</option>
                    </Field>
                    {errors.vendor && touched.vendor && (
                      <div className="text-red-500 text-sm mt-1">{errors.vendor}</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Invoice Details Section */}
              <div ref={invoiceRef} className="mb-8 scroll-mt-20">
                <h3 className="flex items-center text-lg font-semibold mb-4">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none">
                    <rect width="20" height="20" x="2" y="2" rx="2" className="fill-blue-100"/>
                  </svg>
                  Invoice Details
                </h3>

                <div className="mb-6">
                  <h4 className="font-medium mb-4">General Information</h4>
                  <div className="mb-4">
                    <label className="block text-sm mb-1">
                      Purchase Order Number <span className="text-red-500">*</span>
                    </label>
                    <Field
                      as="select"
                      name="poNumber"
                      className={`w-full border rounded-lg p-2 ${
                        errors.poNumber && touched.poNumber ? 'border-red-500' : ''
                      }`}
                    >
                      <option value="">Select PO Number</option>
                      {purchaseOrders.map(po => (
                        <option key={po.value} value={po.value}>{po.label}</option>
                      ))}
                    </Field>
                    {errors.poNumber && touched.poNumber && (
                      <div className="text-red-500 text-sm mt-1">{errors.poNumber}</div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Invoice Details</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-1">
                        Invoice Number <span className="text-red-500">*</span>
                      </label>
                      <Field
                        type="text"
                        name="invoiceNumber"
                        className={`w-full border rounded-lg p-2 ${
                          errors.invoiceNumber && touched.invoiceNumber ? 'border-red-500' : ''
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">
                        Invoice Date <span className="text-red-500">*</span>
                      </label>
                      <Field
                        type="date"
                        name="invoiceDate"
                        className={`w-full border rounded-lg p-2 ${
                          errors.invoiceDate && touched.invoiceDate ? 'border-red-500' : ''
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-1">
                        Total Amount <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2">$</span>
                        <Field
                          type="number"
                          name="totalAmount"
                          className={`w-full border rounded-lg pl-8 p-2 ${
                            errors.totalAmount && touched.totalAmount ? 'border-red-500' : ''
                          }`}
                          placeholder="0.00"
                        />
                        <span className="absolute right-3 top-2 text-gray-500">USD</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm mb-1">
                        Payment Terms <span className="text-red-500">*</span>
                      </label>
                      <Field
                        as="select"
                        name="paymentTerms"
                        className={`w-full border rounded-lg p-2 ${
                          errors.paymentTerms && touched.paymentTerms ? 'border-red-500' : ''
                        }`}
                      >
                        <option value="">Select</option>
                        <option value="net30">Net 30</option>
                        <option value="net60">Net 60</option>
                      </Field>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expense Details Section */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">Expense Details</h4>
                  <div className="text-right">
                    <span className="text-gray-500">$0.00 / </span>
                    <span className="text-blue-500">$0.00</span>
                    <button type="button" className="ml-2 text-white bg-blue-500 rounded-full w-6 h-6">$</button>
                    <button type="button" className="ml-2 text-gray-500 border rounded-full w-6 h-6">%</button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-1">
                        Line Amount <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2">$</span>
                        <Field
                          type="number"
                          name="lineAmount"
                          className={`w-full border rounded-lg pl-8 p-2 ${
                            errors.lineAmount && touched.lineAmount ? 'border-red-500' : ''
                          }`}
                          placeholder="0.00"
                        />
                        <span className="absolute right-3 top-2 text-gray-500">USD</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm mb-1">
                        Department <span className="text-red-500">*</span>
                      </label>
                      <Field
                        as="select"
                        name="department"
                        className={`w-full border rounded-lg p-2 ${
                          errors.department && touched.department ? 'border-red-500' : ''
                        }`}
                      >
                        <option value="">Select Department</option>
                        {departments.map(dept => (
                          <option key={dept.value} value={dept.value}>{dept.label}</option>
                        ))}
                      </Field>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-1">
                        Account <span className="text-red-500">*</span>
                      </label>
                      <Field
                        as="select"
                        name="account"
                        className={`w-full border rounded-lg p-2 ${
                          errors.account && touched.account ? 'border-red-500' : ''
                        }`}
                      >
                        <option value="">Select Account</option>
                        {accounts.map(acc => (
                          <option key={acc.value} value={acc.value}>{acc.label}</option>
                        ))}
                      </Field>
                    </div>
                    <div>
                      <label className="block text-sm mb-1">
                        Location <span className="text-red-500">*</span>
                      </label>
                      <Field
                        as="select"
                        name="location"
                        className={`w-full border rounded-lg p-2 ${
                          errors.location && touched.location ? 'border-red-500' : ''
                        }`}
                      >
                        <option value="">Select Location</option>
                        {locations.map(loc => (
                          <option key={loc.value} value={loc.value}>{loc.label}</option>
                        ))}
                      </Field>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm mb-1">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="text"
                      name="expenseDescription"
                      className={`w-full border rounded-lg p-2 ${
                        errors.expenseDescription && touched.expenseDescription ? 'border-red-500' : ''
                      }`}
                    />
                  </div>

                  <button
                    type="button"
                    className="text-blue-500 flex items-center"
                    onClick={() => {
                      console.log('Add expense coding clicked');
                    }}
                  >
                    <span className="mr-1">+</span> Add Expense Coding
                  </button>
                </div>
              </div>

              {/* Comments Section */}
              <div ref={commentsRef} className="mb-8 scroll-mt-20">
                <h3 className="flex items-center text-lg font-semibold mb-4">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none">
                    <rect width="20" height="20" x="2" y="2" rx="2" className="fill-blue-100"/>
                  </svg>
                  Comments
                </h3>
                <div className="relative">
                  <Field
                    type="text"
                    name="comments"
                    placeholder="Add a comment and use @Name to tag someone"
                    className="w-full border rounded-lg p-2 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-2"
                    onClick={() => {
                      console.log('Comment submitted');
                    }}
                  >
                    <svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex justify-between items-center">
                <button type="button" className="p-2">
                  <Menu size={20} />
                </button>
                <div className="flex gap-4">
                  <button
                    type="button"
                    className="px-6 py-2 border rounded-lg hover:bg-gray-50"
                    onClick={() => {
                      localStorage.setItem('invoiceData', JSON.stringify(values));
                      alert('Draft saved successfully!');
                    }}
                  >
                    Save as Draft
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      'Submit & New'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>

      {/* Success Message */}
      {isSuccessVisible && (
        <div 
          className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-xl z-50"
          style={{ animation: 'slideIn 0.5s ease-out' }}
        >
          <div className="flex items-center">
            <svg 
              className="w-6 h-6 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M5 13l4 4L19 7"
              />
            </svg>
            <div>
              <h4 className="font-semibold">Success!</h4>
              <p className="text-sm">Form submitted successfully!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceForm;