const getVendorFees = () => {
  return `SELECT *
    FROM vendor_fees vf
      WHERE vf.vendor_id = 1
       ;`
}

export default getVendorFees
