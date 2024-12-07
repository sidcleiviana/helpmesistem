from fastapi import APIRouter, HTTPException
from datetime import datetime
from database import supabase 

router = APIRouter()

# Criar feedback
@router.post("/")
def criar_feedback(tipo: str, descricao: str, usuarios_id: int):
    try:
        response = supabase.table("feedbacks").insert({
            "tipo": tipo,
            "descricao": descricao,
            "data_envio": datetime.now().isoformat(),  # Data atual
            "usuarios_id": usuarios_id
        }).execute()

        if response.status_code != 201:
            raise HTTPException(status_code=response.status_code, detail="Erro ao criar feedback")

        return {"status": "Feedback enviado", "resultado": response.data}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Buscar feedbacks por usuário
@router.get("/{usuarios_id}")
def listar_feedbacks(usuarios_id: int):
    try:
        response = supabase.table("feedbacks").select("*").eq("usuarios_id", usuarios_id).execute()
        return {"status": "Sucesso", "dados": response.data}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
