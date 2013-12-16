#!/usr/bin/env ruby

require 'sinatra'
require 'json'
require 'eventmachine'
require 'faye'
require 'socket'

#set :environment, :production
set :bind, '0.0.0.0'
set :port, 9456
set :public_folder, File.dirname(__FILE__) + '/public'
Store = Hash.new

sock = TCPSocket.open('localhost', 9568)

helpers do
	def faye_url
		"http://10.0.0.8:9001/faye/"
	end

	def faye_js
		faye_url + "client.js"
	end
end

get '/hi' do
	  "Hello World!"
end

post '/posttab' do
	content_type :json
	clientid = params[:id]
	return 403 unless clientid
	Store[clientid] = params[:tabs]
	sock.puts clientid
	{"result" => "ok", "id" => clientid}.to_json
end

get '/gettab' do
	content_type :json
	clientid = params[:id]
	return 403 unless clientid

	Store[clientid].to_json
end

get '/mytab/:id' do
	@id = params[:id]
	erb :mytab
end
