const { createClient } = require("@supabase/supabase-js");


const supabseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY

const supabse = createClient(supabseUrl, supabaseKey)

if (!supabseUrl || !supabaseKey) {
    throw new Error("Missing Supabase Environmental Variables");
}


module.exports = supabse
