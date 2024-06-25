import React from "react";
import Savvy from "../Assets/savvy.png";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import displayInr from "../data/IndCur";

const Invoice = ({ isOpen, onClose, invoice }) => {
  const { user } = useSelector((state) => state.user);

  if (!isOpen) return null;

  const subtotal = invoice.products.reduce(
    (acc, product) => acc + product.quantity * product.productId.sellingPrice,
    0
  );
  const tax = Math.round((subtotal / 100) * 2);
  const discount = invoice.products.reduce(
    (acc, product) =>
      acc +
      (product.productId.price - product.productId.sellingPrice) *
        product.quantity,
    0
  );
  const total = subtotal + tax;

  return (
    <>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center mt-16">
        <div
          className="max-w-3xl w-full mx-4 md:mx-auto px-4 py-1 bg-white relative rounded shadow-sm overflow-y-auto h-[90vh]"
          id="invoice"
        >
          <div className="grid grid-cols-2 items-center">
            <div>
              {/* Company logo */}
              <img
                src={Savvy}
                alt="company-logo"
                className="w-48 h-48 object-scale-down"
              />
            </div>
            <div className="text-right mt-1">
              <p>Shop Savvy</p>
              <p className="text-gray-500 text-sm">shop@savvy.com</p>
              <p className="text-gray-500 text-sm mt-1">+41-442341232</p>
              <p className="text-gray-500 text-sm mt-1">VAT: 8657671212</p>
            </div>
          </div>
          {invoice ? (
            <div>
              {/* Client info */}
              <div className="grid grid-cols-2 items-center">
                <div>
                  <p className="font-bold text-gray-800">Bill to :</p>
                  <p className="text-gray-500 text-xs md:text-sm">
                    {user.name}
                    <br />
                    {invoice.addressId.houseNo}, {invoice.addressId.area},{" "}
                    {invoice.addressId.district}, {invoice.addressId.state}
                  </p>
                  <p className="text-gray-500 text-xs md:text-sm">
                    Mob: {invoice.addressId.phoneNumber}
                  </p>
                </div>
                <div className="text-right text-xs md:text-sm">
                  <p>
                    Invoice date:{" "}
                    <span className="text-gray-500">
                      {new Date(invoice.createdAt).toLocaleDateString()}
                    </span>
                  </p>
                  <p>
                    Invoice no:{" "}
                    <span className="text-gray-500">INV-2023786123</span>
                  </p>
                  <p>
                    Receipt no:{" "}
                    <span className="text-gray-500">
                      {invoice.paymentReceipt}
                    </span>
                  </p>
                </div>
              </div>
              {/* Invoice Items */}
              <div className="-mx-4 mt-4 flow-root sm:mx-0">
                <table className="min-w-full">
                  <colgroup>
                    <col className="w-full sm:w-1/2" />
                    <col className="sm:w-1/6" />
                    <col className="sm:w-1/6" />
                    <col className="sm:w-1/6" />
                  </colgroup>
                  <thead className="border-b border-gray-300 text-gray-900">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        Items
                      </th>
                      <th
                        scope="col"
                        className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-0"
                      >
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.products.map((product) => (
                      <tr
                        className="border-b border-gray-200"
                        key={product._id}
                      >
                        <td className="max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0">
                          <div className="font-medium truncate text-gray-900">
                            {product.productId.productName}
                          </div>
                          <div className="mt-1 truncate text-gray-500">
                            {product.productId.description}
                          </div>
                        </td>
                        <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
                          {product.quantity}
                        </td>
                        <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
                          {displayInr(product.productId.sellingPrice)}
                        </td>
                        <td className="py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0">
                          {displayInr(
                            product.quantity * product.productId.sellingPrice
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th
                        scope="row"
                        colSpan={3}
                        className="hidden pl-4 pr-3 pt-6 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
                      >
                        Subtotal
                      </th>
                      <th
                        scope="row"
                        className="pl-6 pr-3 pt-6 text-left text-sm font-normal text-gray-500 sm:hidden"
                      >
                        Subtotal
                      </th>
                      <td className="pl-3 pr-6 pt-6 text-right text-sm text-gray-500 font-semibold sm:pr-0">
                        {displayInr(subtotal)}
                      </td>
                    </tr>
                    <tr>
                      <th
                        scope="row"
                        colSpan={3}
                        className="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
                      >
                        Tax
                      </th>
                      <th
                        scope="row"
                        className="pl-6 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden"
                      >
                        Tax
                      </th>
                      <td className="pl-3 pr-6 pt-4 text-right text-sm text-gray-500 sm:pr-0">
                        {displayInr(tax)}
                      </td>
                    </tr>
                    <tr>
                      <th
                        scope="row"
                        colSpan={3}
                        className="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
                      >
                        Discount
                      </th>
                      <th
                        scope="row"
                        className="pl-6 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden"
                      >
                        Discount
                      </th>
                      <td className="pl-3 pr-6 pt-4 text-right text-sm text-green-500 sm:pr-0">
                        {displayInr(discount)}
                      </td>
                    </tr>
                    <tr>
                      <th
                        scope="row"
                        colSpan={3}
                        className="hidden pl-4 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell sm:pl-0"
                      >
                        Total
                      </th>
                      <th
                        scope="row"
                        className="pl-6 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden"
                      >
                        Total
                      </th>
                      <td className="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-0">
                        {displayInr(total)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          ) : (
            <div>No Order Found</div>
          )}
          {/* Footer */}
          <div className="border-t-2 pt-4 text-xs text-gray-500 text-center mt-4">
            Please pay the invoice before the due date. You can pay the invoice
            by logging in to your account from our client portal.
          </div>
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            <RxCross2 size={24} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Invoice;
