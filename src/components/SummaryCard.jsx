import React from 'react';

/**
 * Reusable SummaryCard Component
 * Computes and displays dynamic pricing, coupon reductions, and overall enrollment totals
 */
export default function SummaryCard({
  course,
  couponInput,
  setCouponInput,
  appliedCoupon,
  couponMessage,
  couponError,
  onApplyCoupon,
  onRemoveCoupon,
  baseFee,
  discountAmount,
  netFee,
  isFormValid,
  isSubmitting,
  onReset
}) {
  return (
    <div className="summary-card">
      <div className="summary-header">
        <h3 className="summary-title">Enrollment Summary</h3>
        <span className="summary-tag">Live Quotation</span>
      </div>

      <div className="pricing-rows">
        <div className="price-row">
          <span className="row-label">Selected Course:</span>
          <span className="row-val font-semibold">
            {course ? course.title : 'None selected'}
          </span>
        </div>

        <div className="price-row">
          <span className="row-label">Base Tuition Fee:</span>
          <span className="row-val">₹{baseFee.toLocaleString('en-IN')}</span>
        </div>

        {appliedCoupon && (
          <div className="price-row discount-row">
            <span className="row-label">
              Scholarship / Coupon ({appliedCoupon.code}):
            </span>
            <span className="row-val discount-val">
              - ₹{discountAmount.toLocaleString('en-IN')} ({appliedCoupon.discountPercent}%)
            </span>
          </div>
        )}

        <div className="price-row divider"></div>

        <div className="price-row total-row">
          <span className="total-label">Total Payable:</span>
          <span className="total-amount">₹{netFee.toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* Coupon Application Box */}
      <div className="coupon-box">
        <label htmlFor="couponInput" className="coupon-label">
          Have a Scholarship or Discount Coupon?
        </label>
        <div className="coupon-input-group">
          <input
            id="couponInput"
            type="text"
            placeholder="e.g. STUDENT50"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
            disabled={!course || Boolean(appliedCoupon)}
            className="coupon-input"
          />
          {appliedCoupon ? (
            <button
              type="button"
              className="btn-coupon btn-remove-coupon"
              onClick={onRemoveCoupon}
            >
              Remove
            </button>
          ) : (
            <button
              type="button"
              className="btn-coupon btn-apply-coupon"
              onClick={onApplyCoupon}
              disabled={!course || !couponInput.trim()}
            >
              Apply
            </button>
          )}
        </div>

        {/* Coupon feedback messages */}
        {couponMessage && <p className="coupon-success-text">🎉 {couponMessage}</p>}
        {couponError && <p className="coupon-error-text">⚠️ {couponError}</p>}

        {/* Coupon Hints */}
        <div className="coupon-chips">
          <span className="chips-hint">Available Coupons:</span>
          <button
            type="button"
            className="chip"
            onClick={() => setCouponInput('STUDENT50')}
            disabled={Boolean(appliedCoupon)}
          >
            STUDENT50 (50% Off)
          </button>
          <button
            type="button"
            className="chip"
            onClick={() => setCouponInput('EARLYBIRD20')}
            disabled={Boolean(appliedCoupon)}
          >
            EARLYBIRD20 (20% Off)
          </button>
        </div>
      </div>

      {/* Submit Trigger Box */}
      <div className="submit-section">
        <button
          type="submit"
          form="enrollmentForm"
          disabled={!isFormValid || isSubmitting}
          className={`btn-submit ${isFormValid ? 'btn-submit-active' : 'btn-submit-disabled'}`}
        >
          {isSubmitting ? (
            <span className="submitting-spinner">
              <span className="spinner-dot"></span> Processing Enrollment...
            </span>
          ) : (
            <span>🚀 Complete Enrollment & Generate Receipt</span>
          )}
        </button>

        {!isFormValid && (
          <p className="submit-disabled-hint">
            🔒 Submit is disabled until all required fields pass validation.
          </p>
        )}

        <button
          type="button"
          onClick={onReset}
          className="btn-reset-form"
          disabled={isSubmitting}
        >
          ↺ Clear Form & Reset
        </button>
      </div>
    </div>
  );
}
