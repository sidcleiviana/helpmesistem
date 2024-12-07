from supabase import create_client


# Config do banco de dados
SUPABASE_URL = "https://kotekyodzbjksfcxqutd.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvdGVreW9kemJqa3NmY3hxdXRkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMjIxOTMyNywiZXhwIjoyMDQ3Nzk1MzI3fQ.MFcmCISnhFTui-_TxlC1J78dwiRPwUFGOFsw9qBtQlg"

# Inicia cliente do Supabase
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)