
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wyusiwhrvyqxhqlaxljv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5dXNpd2hydnlxeGhxbGF4bGp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4Njg1MjIsImV4cCI6MjA4NjQ0NDUyMn0.zWLfE3JTF3ILZQ8O5CGumVlVOchMc_xaNZ1O1fi9SFM';

export const supabase = createClient(supabaseUrl, supabaseKey);
