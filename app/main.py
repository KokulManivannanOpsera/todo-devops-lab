from pathlib import Path

from fastapi import Depends, FastAPI, Form, Request
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session

from app.database import Base, engine, get_db
from app.models import Todo

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Todo DevOps Lab", version="0.1.0")
templates = Jinja2Templates(directory=str(Path(__file__).parent / "templates"))


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/", response_class=HTMLResponse)
def list_todos(request: Request, db: Session = Depends(get_db)):
    todos = db.query(Todo).order_by(Todo.id.desc()).all()
    return templates.TemplateResponse(
        request,
        "index.html",
        {"todos": todos},
    )


@app.post("/todos")
def add_todo(title: str = Form(...), db: Session = Depends(get_db)):
    cleaned = title.strip()
    if cleaned:
        db.add(Todo(title=cleaned))
        db.commit()
    return RedirectResponse(url="/", status_code=303)


@app.post("/todos/{todo_id}/toggle")
def toggle_todo(todo_id: int, db: Session = Depends(get_db)):
    todo = db.get(Todo, todo_id)
    if todo:
        todo.done = not todo.done
        db.commit()
    return RedirectResponse(url="/", status_code=303)


@app.post("/todos/{todo_id}/delete")
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    todo = db.get(Todo, todo_id)
    if todo:
        db.delete(todo)
        db.commit()
    return RedirectResponse(url="/", status_code=303)
