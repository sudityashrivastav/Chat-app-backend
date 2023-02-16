const { createClient } = require('@supabase/supabase-js');

const url = process.env['url']

  const key = process.env['key']
const  supabase = createClient(url,key);
module.exports = supabase;



