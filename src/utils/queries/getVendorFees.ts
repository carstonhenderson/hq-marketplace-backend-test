const getVendorFees = (vendor_id: string) => {
  return `SELECT *
    FROM vendor_fees vf
      WHERE vf.vendor_id = '${vendor_id}'
      LIMIT 1
       ;`
}

export default getVendorFees
