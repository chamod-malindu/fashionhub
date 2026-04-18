interface Props {
  itemCount: number;
  itemTotal: number;
  deliveryFee: number;
}

export default function OrderSummary({ itemCount, itemTotal, deliveryFee }: Props) {
  return (
    <div className="space-y-4 pt-5 border-t border-gray-100">
      <div className="flex justify-between">
        <span className="text-sm text-gray-400">Total Items ({itemCount})</span>
        <span className="text-sm font-semibold text-gray-900">
          ${itemTotal.toFixed(2)}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-gray-400">Standard Delivery</span>
        <span className="text-sm font-semibold text-gray-900">
          ${deliveryFee.toFixed(2)}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm font-semibold text-gray-900">Total Payment</span>
        <span className="text-sm font-semibold text-gray-900">
          ${(itemTotal + deliveryFee).toFixed(2)}
        </span>
      </div>
    </div>
  );
}