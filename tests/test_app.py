from pathlib import Path

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.database import Base, get_db
from app.main import app


@pytest.fixture()
def client(tmp_path: Path):
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    TestingSession = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    Base.metadata.create_all(bind=engine)

    def override_get_db():
        db = TestingSession()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()


def test_health(client: TestClient):
    r = client.get("/health")
    assert r.status_code == 200
    assert r.json() == {"status": "ok"}


def test_add_toggle_delete(client: TestClient):
    r = client.post("/todos", data={"title": "Learn Docker"}, follow_redirects=True)
    assert r.status_code == 200
    assert "Learn Docker" in r.text

    r = client.post("/todos/1/toggle", follow_redirects=True)
    assert r.status_code == 200
    assert 'class="done"' in r.text

    r = client.post("/todos/1/delete", follow_redirects=True)
    assert r.status_code == 200
    assert "Learn Docker" not in r.text
