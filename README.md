# ml_interpretability_UI

**MUST HAVE Nvidia Cuda Toolkits installed**:
https://developer.nvidia.com/cuda-downloads

To run the frontend (on Windows) for development:
1. First open command prompt (cmd) and proceed to
	> cd ..\ml_interpretability_UI\backend
2. Do a pip install on the requirements.txt file
	> pip install -r requirements.txt
3. Once all packages are installed run the backend
	> python manage.py runserver
4. The backend should now be running, now open another command prompt (cmd) and move to this folder:
	> cd ..\ml_interpretability_UI\frontend
5. Install the npm packages required to run the frontend:
	> npm install
6. Start the npm server to open the localhost:3000 port
	> npm start
