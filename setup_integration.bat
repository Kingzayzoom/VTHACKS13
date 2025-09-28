@echo off
echo INTEGRATION: Setting up VT Housing Chatbot Integration...
echo.

echo INTEGRATION: Installing backend dependencies...
cd VTHACKS\backend
pip install -r requirements.txt

echo.
echo INTEGRATION: Setup complete!
echo.
echo INTEGRATION: To start the development environment:
echo 1. Create a .env file in VTHACKS\backend\ with your Databricks credentials:
echo    DATABRICKS_HOST=https://your-workspace.cloud.databricks.com
echo    DATABRICKS_TOKEN=your_token_here
echo    ENDPOINT=databricks-gpt-oss-120b
echo.
echo 2. Start the backend: cd VTHACKS\backend && python app.py
echo.
echo 3. Start the frontend: cd VTHACKS && npm run dev
echo.
echo INTEGRATION: Backend will run on http://localhost:5000
echo INTEGRATION: Frontend will run on http://localhost:5173
echo.
pause
