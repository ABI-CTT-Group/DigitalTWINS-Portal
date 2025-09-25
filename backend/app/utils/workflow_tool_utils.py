from sqlalchemy.orm import Session
from app.models.db_model import (PluginBuild, BuildStatus)
from app.client.minio import get_minio_client
from fastapi import HTTPException


def get_build_record_or_404(build_id: str, db: Session):
    build_record = db.query(PluginBuild).filter(PluginBuild.build_id == build_id).first()
    if build_record is None:
        raise HTTPException(status_code=404, detail="Build not found")

    if not build_record.s3_path:
        raise HTTPException(status_code=404, detail="No artifacts available for this build")

    if build_record.status != BuildStatus.COMPLETED.value:
        raise HTTPException(status_code=400, detail="Build is not completed")

    return build_record


def get_object_key_from_s3_path(s3_path: str) -> str:
    if not s3_path.startswith("s3://"):
        raise HTTPException(status_code=500, detail="Invalid S3 path format")
    return s3_path.replace("s3://", "").split("/", 1)[1]


def get_public_url_for_build(build_record: PluginBuild) -> tuple[str, str]:
    s3_path = build_record.s3_path
    object_key = get_object_key_from_s3_path(s3_path)
    minio_client = get_minio_client()
    url = minio_client.get_public_url(object_key)
    return url, s3_path
