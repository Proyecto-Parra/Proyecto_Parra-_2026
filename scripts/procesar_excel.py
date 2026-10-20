import pandas as pd

def procesar_logueos_orion(ruta_archivo):
    """
    Carga y procesa archivos CSV o Excel de asistencia/logueos.
    """
    try:
        if ruta_archivo.endswith('.csv'):
            df = pd.read_csv(ruta_archivo, encoding='utf-8-sig', on_bad_lines='skip')
        else:
            excel_obj = pd.ExcelFile(ruta_archivo)
            nombre_hoja = 'OCTUBRE' if 'OCTUBRE' in excel_obj.sheet_names else excel_obj.sheet_names
            df = pd.read_excel(ruta_archivo, sheet_name=nombre_hoja)

        # Limpiar filas completamente vacías
        df_limpio = df.dropna(how='all').fillna('')
        
        # Convertir nombres de columnas a texto limpio
        columnas = [str(col).strip() for col in df_limpio.columns]
        df_limpio.columns = columnas

        return {
            "status": "ok",
            "total_registros": len(df_limpio),
            "columnas": columnas,
            "datos": df_limpio.head(50).to_dict(orient='records')
        }
    except Exception as e:
        return {"status": "error", "mensaje": str(e)}