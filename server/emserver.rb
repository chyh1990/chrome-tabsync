#!/usr/bin/env ruby

require 'eventmachine'
require 'faye'
require 'json'

module EchoServer
   def post_init
     puts "-- someone connected to the echo server!"
     @client = Faye::Client.new('http://localhost:9001/faye')
   end

   def receive_data data
	   @client.publish '/tab/'+data.chomp, 'UPDATE'
   end

   def unbind
     puts "-- someone disconnected from the echo server!"
   end
end

# Note that this will block current thread.
EventMachine.run {

  EventMachine.start_server "127.0.0.1", 9568, EchoServer
}

