from fastapi import APIRouter, HTTPException
from database import supabase  # Instância do cliente Supabase

router = APIRouter()

# Criar módulo
@router.post("/")
def criar_modulo(nome: str, descricao: str):
    try:
        response = supabase.table("modulos").insert({
            "nome": nome,
            "descricao": descricao
        }).execute()

        if response.status_code != 201:
            raise HTTPException(status_code=response.status_code, detail="Erro ao criar módulo")

        return {"status": "Módulo criado", "resultado": response.data}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Listar módulos
@router.get("/")
def listar_modulos():
    response = supabase.table("modulos").select("*").execute()
    return {"status": "Sucesso", "dados": response.data}
