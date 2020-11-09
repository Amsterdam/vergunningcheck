cd /path/to/projectroot/
. env/bin/activate
export https_proxy=http://.../
export http_proxy=http://.../
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
sudo find /etc/init.d/{uwsgi,nginx,varnish,haproxy} -exec {} restart \;
