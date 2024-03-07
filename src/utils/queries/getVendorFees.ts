const getVendorFees = (vendor_id: string) => {
  return `SELECT *
    FROM vendor_fees vf
      WHERE vf.vendor_id = ${vendor_id}
       ;`
}

export default getVendorFees
